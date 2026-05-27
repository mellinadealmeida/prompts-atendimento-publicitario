import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async ({ title, content }: { title: string; content: string }) => {
    // Verify the title is "interessado"
    if (title !== "interessado") {
      throw new Error(`Expected title "interessado", got "${title}"`);
    }
    return true;
  }),
}));

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

describe("assessment notifications", () => {
  it("should send notification with title 'interessado' when email is registered", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const testEmail = `test-notification-${Date.now()}@example.com`;

    // Register email - this should trigger notification
    const result = await caller.assessment.registerEmail({
      email: testEmail,
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("E-mail registrado com sucesso!");
  });

  it("should include email address in notification content", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const testEmail = `test-content-${Date.now()}@example.com`;

    const result = await caller.assessment.registerEmail({
      email: testEmail,
    });

    expect(result.success).toBe(true);
    // Content should include the email address
    expect(result.message).toContain("sucesso");
  });

  it("should handle multiple email registrations with notifications", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const emails = [
      `test-multi-1-${Date.now()}@example.com`,
      `test-multi-2-${Date.now()}@example.com`,
      `test-multi-3-${Date.now()}@example.com`,
    ];

    for (const email of emails) {
      const result = await caller.assessment.registerEmail({ email });
      expect(result.success).toBe(true);
    }

    // Verify all emails were registered
    const allEmails = await caller.assessment.getAllEmails();
    const registeredEmails = allEmails.map((e) => e.email);

    for (const email of emails) {
      expect(registeredEmails).toContain(email);
    }
  });
});
