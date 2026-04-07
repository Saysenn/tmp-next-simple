// Email template variant selection
// Change these to switch which email design is sent for each form type

export type ContactEmailTemplate = "default" | "bold" | "classic" | "minimal";
export type SubscribeEmailTemplate = "default" | "bold" | "classic" | "minimal";
export type ApplicationEmailTemplate = "minimal";

export const emailTemplatesConfig = {
  /** Contact form notification email design: "default" | "bold" | "classic" | "minimal" */
  contactTemplate: "default" as ContactEmailTemplate,

  /** Subscribe/waitlist notification email design: "default" | "bold" | "classic" | "minimal" */
  subscribeTemplate: "default" as SubscribeEmailTemplate,

  /** Application/CV form notification email design: "minimal" */
  applicationTemplate: "minimal" as ApplicationEmailTemplate,
};
