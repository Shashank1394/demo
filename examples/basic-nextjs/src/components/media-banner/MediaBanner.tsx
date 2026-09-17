import { ComponentProps } from '../../lib/component-props';
import { MediaBannerDefault } from './MediaBannerDefault.dev';
import { MediaBannerImageDown } from './MediaBannerImageDown.dev';

export const Default = (props: ComponentProps) => {
  return <MediaBannerDefault {...props} />;
};

export const ImageDown = (props: ComponentProps) => {
  return <MediaBannerImageDown {...props} />;
};