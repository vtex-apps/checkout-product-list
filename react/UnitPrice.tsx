import React from 'react'
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'

import { useItemContext } from './ItemContext'
import styles from './styles.css'
import { opaque } from './utils/opaque'
import { parseTextAlign, TextAlignProp } from './utils/textAlign'

const CSS_HANDLES = [
  'unitPriceContainer',
  'unitPricePerUnitCurrency',
  'unitPriceMeasurementUnit',
] as const

const UnitPrice: StorefrontFunctionComponent<TextAlignProp> = ({
  textAlign,
}) => {
  const { item, loading } = useItemContext()
  const handles = useCssHandles(CSS_HANDLES)

  if (loading) {
    return null
  }

  return item.quantity > 1 && item.price && item.price > 0 ? (
    <div
      id={`unit-price-${item.id}`}
      className={`t-mini c-muted-1 lh-title ${handles.unitPriceContainer} ${
        styles.quantity
      } ${opaque(item.availability)} ${parseTextAlign(textAlign)}`}
    >
      <FormattedMessage
        id="store/product-list.pricePerUnit"
        values={{
          price: (
            <div className={`${handles.unitPricePerUnitCurrency} dib`}>
              <FormattedCurrency value={item.price / 100} />
            </div>
          ),
          perMeasurementUnit: (
            <div className={`${handles.unitPriceMeasurementUnit} dib`}>
              <FormattedMessage
                id="store/product-list.pricePerUnit.measurementUnit"
                values={{ measurementUnit: item.measurementUnit }}
              />
            </div>
          ),
        }}
      />
    </div>
  ) : null
}

UnitPrice.defaultProps = {
  textAlign: 'left',
}

UnitPrice.schema = {
  properties: {
    textAlign: {
      type: 'string',
      default: UnitPrice.defaultProps.textAlign,
      isLayout: true,
    },
  },
}

export default UnitPrice
