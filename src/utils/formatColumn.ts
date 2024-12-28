export function formatColumnKey(columnKey: string) {
    return columnKey
      .replace(/([A-Z])/g, ' $1') 
      .replace(/^./, str => str.toUpperCase());
  }