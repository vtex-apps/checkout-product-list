import React, { FunctionComponent } from 'react'
import { IconDelete } from 'vtex.styleguide'

import FormattedPrice from './FormattedPrice'
import Selector from './QuantitySelector'

import styles from '../styles.css'

interface Props {
  currency: string
  item: Item
  onQuantityChange: (value: number) => void
  onRemove: () => void
}

const ListItem: FunctionComponent<Props> = ({
  currency,
  item,
  onQuantityChange,
  onRemove,
}) => (
  <div className="c-on-base flex bb b--muted-4 pt5 pt6-m pb5 pb6-m pr6-m pr0-l">
    {/* Image */}
    <div className="flex-none mr5">
      <a href={item.detailUrl}>
        <img alt={item.name} src={item.imageUrl} width="100%" />
      </a>
    </div>

    {/* Desktop Container */}
    <div className="flex-auto flex-m">
      {/* Product Info */}
      <div className="flex-auto w-100 flex mb4 mr7-m">
        {/* Brand and Name */}
        <div className="flex-auto">
          <div className="ttu f7 fw6 c-muted-1 mb2 fw5-m">
            {item.additionalInfo.brandName}
          </div>
          <div>
            <a
              className="c-on-base t-title lh-copy fw6 no-underline fw5-m"
              href={item.detailUrl}
            >
              {item.name}
            </a>
          </div>
          {/* Variations */}
          {item.skuSpecifications && item.skuSpecifications.length > 0 && (
            <div className="mt2 c-muted-1 f6 lh-copy">
              {item.skuSpecifications.map(
                (spec: SKUSpecification, idx: number) => {
                  return (
                    <div key={idx}>
                      {`${spec.fieldName}: ${spec.fieldValues.join(', ')}`}
                    </div>
                  )
                }
              )}
            </div>
          )}
        </div>

        {/* Remove - Mobile */}
        <div className="flex-none dn-m">
          <button className="bg-transparent bn pa2 mt4 mr4" onClick={onRemove}>
            <IconDelete color="#727273" />
          </button>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className={`${styles.quantity} flex-none-m`}>
        <div className={`${styles.quantitySelector}`}>
          <Selector value={item.quantity} onChange={onQuantityChange} />
        </div>

        {item.quantity > 1 && (
          <div className="mt3 t-mini c-muted-1">
            <FormattedPrice currency={currency} value={item.sellingPrice} />
            <span> per {item.measurementUnit}</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className={`${styles.price} mt5 mt0-ns flex-m items-center-m tr-m flex-none-m ml5-m`}>
        <div className="flex-auto">
          {item.listPrice !== item.price && (
            <div className="c-muted-1 strike t-mini mb2">
              <FormattedPrice
                currency={currency}
                value={item.listPrice * item.quantity}
              />
            </div>
          )}
          <div className="div fw6 fw5-m">
            <FormattedPrice
              currency={currency}
              value={item.sellingPrice * item.quantity}
            />
          </div>
        </div>
      </div>

      {/* Remove - Desktop */}
      <div className={`${styles.remove} flex-m items-center-m flex-none-m dn db-m`}>
        <div className="flex-auto">
          <button
            className="pointer bg-transparent bn pa2 ml6"
            onClick={onRemove}
          >
            <IconDelete color="#727273" />
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default ListItem
