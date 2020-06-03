import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { IconDelete, Button } from 'vtex.styleguide'

import { useItemContext } from './ItemContext'
import { opaque } from './utils/opaque'

const CSS_HANDLES = ['removeButtonContainer', 'removeButton'] as const

type DisplayMode = 'icon-button' | 'text-button'
type Variation =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverted-tertiary'
  | 'danger'
  | 'danger-tertiary'

interface Props {
  displayMode?: DisplayMode
  variation?: Variation
}

function RemoveButton(props: Props) {
  const { displayMode = 'icon-button', variation = 'danger' } = props
  const { item, loading, onRemove } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return <Loading />
  }

  if (displayMode === 'text-button') {
    return (
      <Button variation={variation} onClick={onRemove}>
        <FormattedMessage id="store/product-list.delete-button.default-label" />
      </Button>
    )
  }

  return (
    <div
      className={`${handles.removeButtonContainer} ${opaque(
        item.availability
      )}`}
    >
      <button
        id={`remove-button-${item.id}`}
        className={`${handles.removeButton} pointer bg-transparent bn pa2`}
        title="remove"
        onClick={onRemove}
      >
        <IconDelete color="#727273" />
      </button>
    </div>
  )
}

export default RemoveButton
