// Email template variant selection
// Change these to switch which email design is sent for each form type

export type ContactEmailTemplate = "bold" | "classic" | "minimal";
export type SubscribeEmailTemplate = "bold" | "classic" | "minimal";
export type ApplicationEmailTemplate = "minimal";

export const emailTemplatesConfig = {
  /** Contact form notification email design: "bold" | "classic" | "minimal" */
  contactTemplate: "minimal" as ContactEmailTemplate,

  /** Subscribe/waitlist notification email design: "bold" | "classic" | "minimal" */
  subscribeTemplate: "minimal" as SubscribeEmailTemplate,

  /** Application/CV form notification email design: "minimal" */
  applicationTemplate: "minimal" as ApplicationEmailTemplate,
};
