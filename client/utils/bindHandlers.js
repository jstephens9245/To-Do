export default function bindHandlers(ctxt, ...handlers) {
  handlers.forEach((handler) => {
    if (typeof handler === 'string') handler = ctxt[handler];
    const hdlrName = handler.name;
    try {
      ctxt[hdlrName] = handler.bind(ctxt);
    } catch (e) {
      console.warn(`Could not bind the handler ${hdlrName}.`);
    }
  });
}
