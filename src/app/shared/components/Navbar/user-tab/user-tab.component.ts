import { CommonModule } from '@angular/common';
import { Component ,ChangeDetectionStrategy, Input} from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ISidebarNode } from '../../../Models/ISidebarNode';




const treeData: ISidebarNode[] = [
  {
    name: 'Users',
    icon: 'person',
    children: [
      { name: 'Add User', icon: 'person_add', link: '/add-user' },
      { name: 'User Privileges', icon: 'security', link: '/user-privileges' },
    ],
  },
];

@Component({
  selector: 'app-user-tab',
  standalone: true,
  imports: [CommonModule , MatTreeModule, MatButtonModule, MatIconModule],
templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css','../sidebar/sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class UserTabComponent {
  @Input() isCollapsed: boolean = false;
  dataSource = treeData;
  isExpanded: boolean = false;

  childrenAccessor = (node: ISidebarNode) => node.children ?? [];

  hasChild = (_: number, node: ISidebarNode) =>  !!node.children && node.children.length > 0;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
