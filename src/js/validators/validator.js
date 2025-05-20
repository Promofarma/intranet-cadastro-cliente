import { rules as validator } from "./rules.js";

export const validate = (formData, schema) => {
  if (!formData || !schema) {
    throw new Error("FormData and Schema are required.");
  }

  const validated = {};
  const errors = {};

  for (const [field, config] of Object.entries(schema)) {
    const value = formData.get(field);

    for (let rule of config.rules) {
      let ruleName = rule;
      let ruleParam = null;

      if (rule.includes(":")) {
        [ruleName, ruleParam] = rule.split(":");
      }

      const isValid = ruleParam
        ? validator[ruleName]?.(value, ruleParam)
        : validator[ruleName]?.(value);

      if (!isValid) {
        errors[field] = config?.message[ruleName] ?? null;
        break;
      }
    }

    if (!errors[field]) {
      validated[field] = value;
    }
  }

  return {
    validated,
    errors,
  };
};
