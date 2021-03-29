const path = require('path');
const fs = require('fs');

let template = `export type {
  IconComponent,
  IconSize,
  IconVariant,
} from '@contentful/f36-icon';
`;

(function () {
  fs.readdir(path.join('.', 'src'), (error, allFiles) => {
    if (error) {
      console.log('error:');
      console.log(error);
    }

    const files = allFiles.filter((file) => file.endsWith('.tsx'));

    for (const file of files) {
      const icon = file.replace('.tsx', '');

      template =
        template +
        `export { ${icon} } from './${icon}';
`;
    }

    fs.writeFile(
      path.join('.', 'src/index.ts'),
      template,
      {
        encoding: 'utf-8',
      },
      (error) => {
        if (error) {
          console.log('error');
          console.log(error);
        }
      },
    );
  });
})();
