import { type SchemaTypeDefinition } from 'sanity'
import order from '@/sanity/schemaTypes/order'
import cartItem from '@/sanity/schemaTypes/cartitem'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [order,cartItem],
}
