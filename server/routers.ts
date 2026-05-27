import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { addInterestedEmail, getAllInterestedEmails } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  assessment: router({
    registerEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        try {
          await addInterestedEmail(input.email);
          
          // Send notification to owner
          await notifyOwner({
            title: "interessado",
            content: `Novo e-mail interessado: ${input.email}`,
          });
          
          return { success: true, message: "E-mail registrado com sucesso!" };
        } catch (error) {
          console.error("Error registering email:", error);
          return { success: false, message: "Erro ao registrar e-mail" };
        }
      }),
    getAllEmails: publicProcedure.query(async () => {
      const emails = await getAllInterestedEmails();
      return emails;
    }),
  }),
});

export type AppRouter = typeof appRouter;
