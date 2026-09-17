import { ComponentProps } from "../../lib/component-props";
import { ContentDefault } from "./ContentDefault.dev";
import { ContentBulkContent } from "./ContentBulkContent.dev";

export const Default = (props: ComponentProps) => {
  return <ContentDefault {...props} />;
};

export const BulkContent = (props: ComponentProps) => {
  return <ContentBulkContent {...props} />;
};
