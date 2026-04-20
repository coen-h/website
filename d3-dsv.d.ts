declare module "d3-dsv" {
  export function csvParseRows<ParsedRow>(
    csvString: string,
    row: (row: string[], index: number, columns: string[]) => ParsedRow
  ): ParsedRow[];
}
