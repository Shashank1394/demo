// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as PromoCardsDefaultdev from 'src/components/promo-cards/PromoCardsDefault.dev';
import * as PromoCards from 'src/components/promo-cards/PromoCards';
import * as promocardsprops from 'src/components/promo-cards/promo-cards.props';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as MediaBannerImageDowndev from 'src/components/media-banner/MediaBannerImageDown.dev';
import * as MediaBannerDefaultdev from 'src/components/media-banner/MediaBannerDefault.dev';
import * as MediaBanner from 'src/components/media-banner/MediaBanner';
import * as mediabannerprops from 'src/components/media-banner/media-banner.props';
import * as IconCardsImageDowndev from 'src/components/icon-cards/IconCardsImageDown.dev';
import * as IconCardsDefaultdev from 'src/components/icon-cards/IconCardsDefault.dev';
import * as IconCards from 'src/components/icon-cards/IconCards';
import * as iconcardsprops from 'src/components/icon-cards/icon-cards.props';
import * as HeroBannerTwoCTAdev from 'src/components/hero-banner/HeroBannerTwoCTA.dev';
import * as HeroBannerDefaultdev from 'src/components/hero-banner/HeroBannerDefault.dev';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as herobannerprops from 'src/components/hero-banner/hero-banner.props';
import * as Hero from 'src/components/hero/Hero';
import * as ContentDefaultdev from 'src/components/content/ContentDefault.dev';
import * as ContentBulkContentdev from 'src/components/content/ContentBulkContent.dev';
import * as Content from 'src/components/content/Content';
import * as contentprops from 'src/components/content/content.props';
import * as CardGrid from 'src/components/card-grid/CardGrid';
import * as cardgridprops from 'src/components/card-grid/card-grid.props';
import * as CardDetails from 'src/components/card-details/CardDetails';
import * as carddetails from 'src/components/card-details/card-details';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['PromoCardsDefault', { ...PromoCardsDefaultdev }],
  ['PromoCards', { ...PromoCards }],
  ['promo-cards', { ...promocardsprops }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['MediaBannerImageDown', { ...MediaBannerImageDowndev }],
  ['MediaBannerDefault', { ...MediaBannerDefaultdev }],
  ['MediaBanner', { ...MediaBanner }],
  ['media-banner', { ...mediabannerprops }],
  ['IconCardsImageDown', { ...IconCardsImageDowndev }],
  ['IconCardsDefault', { ...IconCardsDefaultdev }],
  ['IconCards', { ...IconCards }],
  ['icon-cards', { ...iconcardsprops }],
  ['HeroBannerTwoCTA', { ...HeroBannerTwoCTAdev }],
  ['HeroBannerDefault', { ...HeroBannerDefaultdev }],
  ['HeroBanner', { ...HeroBanner }],
  ['hero-banner', { ...herobannerprops }],
  ['Hero', { ...Hero }],
  ['ContentDefault', { ...ContentDefaultdev }],
  ['ContentBulkContent', { ...ContentBulkContentdev }],
  ['Content', { ...Content }],
  ['content', { ...contentprops }],
  ['CardGrid', { ...CardGrid }],
  ['card-grid', { ...cardgridprops }],
  ['CardDetails', { ...CardDetails }],
  ['card-details', { ...carddetails }],
]);

export default componentMap;
