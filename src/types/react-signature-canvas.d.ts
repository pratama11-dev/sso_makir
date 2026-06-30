declare module "react-signature-canvas" {
  import * as React from "react";

  export interface SignatureCanvasProps {
    penColor?: string;
    backgroundColor?: string;
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    clearOnResize?: boolean;
  }

  export default class SignatureCanvas extends React.Component<SignatureCanvasProps> {
    clear(): void;
    isEmpty(): boolean;
    fromDataURL(dataUrl: string): void;
    toDataURL(type?: string): string;
    getCanvas(): HTMLCanvasElement;
    getTrimmedCanvas(): HTMLCanvasElement;
    getSignaturePad(): any;
    off(): void;
    on(): void;
  }
}