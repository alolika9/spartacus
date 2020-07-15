import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ConfigFormUpdateEvent } from './config-form.event';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  currentGroup$: Observable<Configurator.Group>;

  UiType = Configurator.UiType;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        filter(
          (routerData) =>
            routerData.pageType === ConfigurationRouter.PageType.CONFIGURATION
        ),
        switchMap((routerData) => {
          return this.configuratorCommonsService.getOrCreateConfiguration(
            routerData.owner
          );
        })
      );

    this.currentGroup$ = this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorGroupsService.getCurrentGroup(routerData.owner)
        )
      );
  }

  updateConfiguration(event: ConfigFormUpdateEvent) {
    const owner: GenericConfigurator.Owner = { key: event.productCode };

    this.configuratorCommonsService.updateConfiguration(
      event.productCode,
      event.groupId,
      event.changedAttribute
    );

    // Wait until update is triggered first, then wait until update is finished, to be sure that the configuration
    // is changed before the group status is set. This cannot be done in the effects, as we need to call the facade layer.
    this.configuratorCommonsService
      .isConfigurationLoading(owner)
      .pipe(
        filter((isLoading) => isLoading.valueOf()),
        take(1)
      )
      .subscribe(() =>
        this.configuratorCommonsService
          .isConfigurationLoading(owner)
          .pipe(
            filter((isLoading) => !isLoading.valueOf()),
            take(1)
          )
          .subscribe(() =>
            this.configuratorGroupsService.setGroupStatus(
              owner,
              event.groupId,
              false
            )
          )
      );
  }
}
