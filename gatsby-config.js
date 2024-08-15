require('dotenv').config();
const userConfig = require('./config');

module.exports = {
  siteMetadata: {
    title: userConfig.siteTitle,
    description: userConfig.siteDesc,
    author: userConfig.siteAuthor,
    logoUrl: userConfig.siteLogoUrl,
  },
  pathPrefix: userConfig.pathPrefix,
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: userConfig.manifestName,
        short_name: userConfig.manifestShortName,
        start_url: userConfig.pathPrefix || userConfig.manifestStartUrl,
        background_color: userConfig.manifestBackgroundColor,
        theme_color: userConfig.manifestThemeColor,
        display: userConfig.manifestDisplay,
        icon: userConfig.manifestIcon, // This path is relative to the root of the site.
      },
    },
  ],
};
