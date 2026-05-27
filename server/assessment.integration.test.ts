import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("assessment integration flow", () => {
  it("should complete full flow: register email and retrieve all emails", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Step 1: Register first email
    const email1 = `test-flow-1-${Date.now()}@example.com`;
    const result1 = await caller.assessment.registerEmail({
      email: email1,
    });

    expect(result1.success).toBe(true);
    expect(result1.message).toBe("E-mail registrado com sucesso!");

    // Step 2: Register second email
    const email2 = `test-flow-2-${Date.now()}@example.com`;
    const result2 = await caller.assessment.registerEmail({
      email: email2,
    });

    expect(result2.success).toBe(true);

    // Step 3: Retrieve all emails and verify both are present
    const allEmails = await caller.assessment.getAllEmails();

    expect(Array.isArray(allEmails)).toBe(true);
    expect(allEmails.length).toBeGreaterThanOrEqual(2);

    const emailAddresses = allEmails.map((e) => e.email);
    expect(emailAddresses).toContain(email1);
    expect(emailAddresses).toContain(email2);

    // Step 4: Verify email structure
    const retrievedEmail = allEmails.find((e) => e.email === email1);
    expect(retrievedEmail).toBeDefined();
    expect(retrievedEmail?.email).toBe(email1);
    expect(retrievedEmail?.createdAt).toBeDefined();
    expect(retrievedEmail?.id).toBeDefined();
  });

  it("should handle duplicate email registration gracefully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const testEmail = `test-duplicate-${Date.now()}@example.com`;

    // Register same email twice
    const result1 = await caller.assessment.registerEmail({
      email: testEmail,
    });

    expect(result1.success).toBe(true);

    const result2 = await caller.assessment.registerEmail({
      email: testEmail,
    });

    // Should succeed without error (duplicate handling)
    expect(result2.success).toBe(true);

    // Verify only one entry exists
    const allEmails = await caller.assessment.getAllEmails();
    const duplicateCount = allEmails.filter((e) => e.email === testEmail).length;

    expect(duplicateCount).toBe(1);
  });

  it("should validate email format on registration", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.assessment.registerEmail({
        email: "invalid-email-format",
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should export emails with correct structure", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Register test email
    const testEmail = `test-export-${Date.now()}@example.com`;
    await caller.assessment.registerEmail({
      email: testEmail,
    });

    // Get all emails
    const emails = await caller.assessment.getAllEmails();

    // Verify structure for export
    expect(emails.length).toBeGreaterThan(0);
    emails.forEach((email) => {
      expect(email).toHaveProperty("email");
      expect(email).toHaveProperty("createdAt");
      expect(email).toHaveProperty("id");
      expect(typeof email.email).toBe("string");
      expect(email.createdAt instanceof Date).toBe(true);
      expect(typeof email.id).toBe("number");
    });
  });
});
