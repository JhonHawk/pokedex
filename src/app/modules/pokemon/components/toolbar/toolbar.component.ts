import { Component, inject, Input, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { InternalRouterService } from '../../../../core/services/internal-router.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ToolbarModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  internalRouter = inject(InternalRouterService)
  previousRoute = '';

  constructor() {}

  ngOnInit() {
    this.previousRoute = this.internalRouter.getPreviousRoute();
  }
}
