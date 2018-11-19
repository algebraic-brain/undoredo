import typescript from 'rollup-plugin-typescript2';
import resolve    from 'rollup-plugin-node-resolve';
import gzip       from 'rollup-plugin-gzip';
import { terser } from 'rollup-plugin-terser';
 
export default {
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        resolve(),
        terser(),
        gzip()
    ]
}