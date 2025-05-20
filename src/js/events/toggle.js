const dispatchEvent = (eventName, detail) => {
  const event = new CustomEvent(eventName, { detail });
  document.dispatchEvent(event);
};

const open = (params) => dispatchEvent("open", params);

const close = (params) => dispatchEvent("close", params);

export const dispatch = {
  open,
  close,
};
