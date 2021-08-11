import { useContext } from 'react'
import { DesignerContext } from '../providers/DesignerProvider'

export const usePrefix = (after = '') => {
  return useContext(DesignerContext)?.prefixCls + after
}
