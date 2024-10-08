import path from 'path';
import {Plugin} from '@docusaurus/types';
import {RuleSetRule} from 'webpack';
import {Config as SvgrConfig} from '@svgr/core';

export default function svgFixPlugin(): Plugin {
  return {
    name: 'svg-fix',
    configureWebpack(config) {
      const svgRule = config.module?.rules?.find((r) =>
        (r as {test: RegExp}).test.test('file.svg'),
      ) as RuleSetRule | undefined;
      if (!svgRule) {
        console.warn(
          'Failed to apply SVG fix, could not find SVG rule in webpack config!',
        );
        return {};
      }
      const svgrLoader = svgRule.oneOf?.find(
        (r) =>
          ((r as RuleSetRule).use as object[] | undefined)?.length === 1 &&
          ((r as RuleSetRule).use as {loader: string}[])?.[0].loader.includes(
            '@svgr/webpack',
          ),
      );
      if (!svgrLoader) {
        console.warn(
          'Failed to apply SVG fix, could not find svgr loader in webpack config!',
        );
        return {};
      }

      const svgoConfig = (svgrLoader.use as {options: SvgrConfig}[])[0].options
        .svgoConfig;
      if (!svgoConfig?.plugins) {
        console.warn(
          'Failed to apply SVG fix, could not find svgo config in webpack config!',
        );
        return {};
      }

      svgoConfig.plugins.push({
        name: 'prefixIds',
        params: {
          delim: '_',
          prefix: (element, file) => {
            return path.basename(file?.path ?? '').split('.')[0];
          },
          prefixIds: true,
          prefixClassNames: true,
        },
      });

      return {};
    },
  };
}
