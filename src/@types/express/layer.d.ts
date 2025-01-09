declare module 'express/lib/router/layer' {
    class Layer {
      handle: Function;
    }
    export = Layer;
}