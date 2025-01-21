declare global {
    interface Window {
      Telegram: {
        WebApp: {
          ready(): void;
          expand(): void;
          close(): void;
          initDataUnsafe: {
            user?: {
              id: number;
              first_name: string;
              last_name?: string;
              username?: string;
            };
          };
          MainButton: {
            show(): void;
            hide(): void;
            setText(text: string): void;
            onClick(fn: () => void): void;
            showProgress(leaveActive?: boolean): void;
            hideProgress(): void;
            enable(): void;
            disable(): void;
          };
          BackButton: {
            show(): void;
            hide(): void;
            onClick(fn: () => void): void;
          };
        };
      };
    }
  }
  
  export {};