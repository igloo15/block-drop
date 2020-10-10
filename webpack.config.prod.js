const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/lib/index.ts',
    mode: 'production',
    module: {
        rules: [
            
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sourceMap: true
                        }    
                    }
                ],
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.prod.json'
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.prod.json'})]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'block-drop',
        libraryTarget: 'umd'
    },
    optimization: {
        minimizer:[new TerserPlugin()]
    },
    externals: {
        'strongly-typed-events': 'strongly-typed-events'
    }
};