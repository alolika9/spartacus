import {
  SHIPPING_ADDRESS_SET_GUARD,
  CHECKOUT_CONFIG_SERVICE,
  ROUTING_CONFIG_SERVICE,
  CHECKOUT_DETAILS_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  ANGULAR_ROUTER,
  ROUTER,
  CHECKOUT_STEP_SERVICE,
} from '../../../../shared/constants_3.0';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SHIPPING_ADDRESS_SET_GUARD_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/checkout/guards/shipping-address-set.guard.ts
  class: SHIPPING_ADDRESS_SET_GUARD,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CHECKOUT_DETAILS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ROUTING_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
  ],
  removeParams: [
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: CHECKOUT_STEP_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
