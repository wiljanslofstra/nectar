import { convertFromDirectory } from 'joi-to-typescript';

convertFromDirectory({
  schemaDirectory: './src/schemas',
  typeOutputDirectory: './src/types',
  debug: true,
  useLabelAsInterfaceName: true,
  indexAllToRoot: false,
});
