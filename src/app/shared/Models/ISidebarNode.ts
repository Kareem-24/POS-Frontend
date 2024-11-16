export interface ISidebarNode {
  name: string;
  icon?: string;
  link?: string;
  children?: ISidebarNode[];
}
