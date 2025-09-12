
// Bundle analysis script
import { analyze } from 'rollup-plugin-analyzer';

export default {
  plugins: [
    analyze({
      summaryOnly: true,
      limit: 10,
    }),
  ],
};