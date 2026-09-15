// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as MediaBanner from 'src/components/media-banner/MediaBanner';
import * as IconCards from 'src/components/icon-cards/IconCards';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as Hero from 'src/components/hero/Hero';
import * as Content from 'src/components/content/Content';
import * as CardGrid from 'src/components/card-grid/CardGrid';
import * as cardgridprops from 'src/components/card-grid/card-grid.props';
import * as CardDetails from 'src/components/card-details/CardDetails';
import * as carddetails from 'src/components/card-details/card-details';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['MediaBanner', { ...MediaBanner }],
  ['IconCards', { ...IconCards }],
  ['HeroBanner', { ...HeroBanner }],
  ['Hero', { ...Hero }],
  ['Content', { ...Content }],
  ['CardGrid', { ...CardGrid }],
  ['card-grid', { ...cardgridprops }],
  ['CardDetails', { ...CardDetails }],
  ['card-details', { ...carddetails }],
]);

export default componentMap;
