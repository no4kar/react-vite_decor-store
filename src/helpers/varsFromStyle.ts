import varsScss from '../style/utils/export.module.scss';
import { pullNumFormStr } from './common.func';

export default Object.freeze({
  tabletMinWidth: pullNumFormStr(varsScss.tabletMinWidth),
  desktopMinWidth: pullNumFormStr(varsScss.desktopMinWidth),

  effectDurationNormal: pullNumFormStr(varsScss.effectDurationNormal),
  effectDurationSlow: pullNumFormStr(varsScss.effectDurationSlow),
  effectDurationVerrySlow: pullNumFormStr(varsScss.effectDurationVerrySlow),

  effectScaleSmall: pullNumFormStr(varsScss.effectScaleSmall),
  effectScaleMedium: pullNumFormStr(varsScss.effectScaleMedium),
  effectScaleLarge: pullNumFormStr(varsScss.effectScaleLarge),
  effectScaleExtraLarge: pullNumFormStr(varsScss.effectScaleExtraLarge),
});
