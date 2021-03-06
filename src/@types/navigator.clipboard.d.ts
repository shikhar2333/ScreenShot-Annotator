declare class ClipboardItem {
    constructor(data: { [mimeType: string]: Blob })
  }
  
  interface Clipboard {
    writeText(newClipText: string): Promise<void>
    write(clipboardItems: ClipboardItem[]): Promise<void>
  }
  
  interface NavigatorClipboard {
    readonly clipboard?: Clipboard
  }
  
  interface Navigator extends NavigatorClipboard {}