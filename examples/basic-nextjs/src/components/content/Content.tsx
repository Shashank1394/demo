import type React from "react";
import type { ComponentProps } from "../../lib/component-props";
import { ContentDefault } from "./ContentDefault.dev";
import { ContentBulkContent } from "./ContentBulkContent.dev";

export const Default: React.FC<ComponentProps> = (props) => {
  return <ContentDefault {...props} />;
};

export const BulkContent: React.FC<ComponentProps> = (props) => {
  return <ContentBulkContent {...props} />;
};
