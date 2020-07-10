import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { OrganizationTableType } from '../shared/organization.model';
import { CostCenterAssignBudgetsComponent } from './budgets/assign/cost-center-assign-budget.component';
import { CostCenterCreateComponent } from './create/cost-center-create.component';
import { CostCenterDetailsComponent } from './details/cost-center-details.component';
import { CostCenterEditComponent } from './edit/cost-center-edit.component';
import { CostCenterListComponent } from './list/cost-center-list.component';
import { CostCenterBudgetListComponent } from './budgets/list/cost-center-budget-list.component';

// TODO: this doesn't work with lazy loaded feature
export const costCenterRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      costCenter: {
        paths: ['organization/cost-centers'],
      },
      costCenterCreate: {
        paths: ['organization/cost-centers/create'],
      },
      costCenterDetails: {
        paths: ['organization/cost-centers/:code'],
      },
      costCenterEdit: {
        paths: ['organization/cost-centers/:code/edit'],
      },
      costCenterBudgets: {
        paths: ['organization/cost-centers/:code/budgets'],
      },
      costCenterAssignBudget: {
        paths: ['organization/cost-centers/:code/assign-budget'],
      },
    },
  },
};

export const costCenterCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageCostCentersListComponent: {
      component: CostCenterListComponent,
      childRoutes: [
        {
          path: 'create',
          component: CostCenterCreateComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: ':code',
          component: CostCenterDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'edit',
              component: CostCenterEditComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
            {
              path: 'budgets',
              component: CostCenterBudgetListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
            {
              path: 'assign-budget',
              component: CostCenterAssignBudgetsComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
          ],
        },
      ],
      guards: [AuthGuard],
    },
  },
};

export const costCenterTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.COST_CENTER]: [
      // TODO: consider cascading from smallest size
      {
        headers: [{ key: 'name' }],
        pagination: {
          sort: 'byName',
          // pageSize: 2,
        },
      },
      {
        breakpoint: BREAKPOINT.xs,
        hideHeader: true,
      },
      {
        breakpoint: BREAKPOINT.md,
        headers: [
          { key: 'name', sortCode: 'byName' },
          { key: 'unit', sortCode: 'byUnit' },
        ],
      },
      {
        breakpoint: BREAKPOINT.lg,
        headers: [
          { key: 'name', sortCode: 'byName' },
          { key: 'code', sortCode: 'byCode' },
          { key: 'currency' },
          { key: 'unit', sortCode: 'byUnit' },
        ],
      },
    ],

    [OrganizationTableType.COST_CENTER_BUDGETS]: [
      {
        headers: [{ key: 'name' }],
        hideHeader: true,
      },
    ],
    [OrganizationTableType.COST_CENTER_ASSIGN_BUDGET]: [
      {
        headers: [{ key: 'name' }],
        hideHeader: true,
      },
    ],
  },
};