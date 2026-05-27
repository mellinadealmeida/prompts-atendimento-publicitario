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

describe("assessment.registerEmail", () => {
  it("should register an email successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.assessment.registerEmail({
      email: "test@example.com",
    });

    expect(result).toEqual({
      success: true,
      message: "E-mail registrado com sucesso!",
    });
  });

  it("should handle invalid email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.assessment.registerEmail({
        email: "invalid-email",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should retrieve all registered emails", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Register an email first
    await caller.assessment.registerEmail({
      email: "test-retrieve@example.com",
    });

    // Get all emails
    const emails = await caller.assessment.getAllEmails();

    expect(Array.isArray(emails)).toBe(true);
    expect(emails.length).toBeGreaterThan(0);
    expect(emails.some((e) => e.email === "test-retrieve@example.com")).toBe(
      true
    );
  });
});
