import { z } from "zod";

export const tasksSchema = z.object({
  taskName: z
    .string()
    .min(5, { message: "Task Name must be at least 5 characters." })
    .max(30, { message: "Task Name must be at most 30 characters." }),
  priority: z.enum(["Urgent", "High", "Normal", "Low"], {
    errorMap: () => ({
      message: "Priority must be one of: Urgent, High, Normal, Low.",
    }),
  }),
  storyPoints: z.coerce
    .number()
    .int(
      "Story Points must be a whole number (no fractions or decimals) and above 0."
    )
    .positive("Story Points must be a positive number above 0.")
    .min(1, { message: "Story Points must be at least 1." })
    .max(20, { message: "Story Points must be at most 20." }),
  assignee: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Assignee must contain only letters and spaces.",
    })
    .min(1, { message: "Assignee is required." }),
  dueDate: z.string().refine(
    (dateString) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(dateString);
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    { message: "Due Date must be a valid date in the future." }
  ),
});

export type TaskFormData = z.infer<typeof tasksSchema>;
