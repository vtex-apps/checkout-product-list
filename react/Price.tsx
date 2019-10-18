import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import { FormattedPrice } from 'vtex.formatted-price'

import { useItemContext } from './components/ItemContext'
import { opaque } from './utils/opaque'
import { parseTextAlign, TextAlignProp } from './utils/textAlign'

import styles from './styles.css'

const Price: StorefrontFunctionComponent<TextAlignProp> = ({ textAlign }) => {
  const { item } = useItemContext()

  return (
    <div
      className={`${opaque(item.availability)} ${styles.price} ${parseTextAlign(
        textAlign
      )}`}
    >
      <div>
        {item.listPrice !== item.price && (
          <div
            id={`${item.id}-list-price`}
            className="c-muted-1 strike t-mini mb2"
          >
            <FormattedCurrency value={(item.listPrice * item.quantity) / 100} />
          </div>
        )}
        <div id={`${item.id}-price`} className="div fw6 fw5-m">
          <FormattedPrice value={(item.sellingPrice * item.quantity) / 100} />
        </div>
      </div>
    </div>
  )
}

Price.defaultProps = {
  textAlign: 'left',
}

Price.schema = {
  properties: {
    textAlign: {
      type: 'string',
      default: Price.defaultProps.textAlign,
      isLayout: true,
    },
  },
}

export default Price
