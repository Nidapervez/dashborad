import { type SchemaTypeDefinition } from 'sanity'
import newOrder from '@/sanity/schemaTypes/newOrder'
import cartItem from '@/sanity/schemaTypes/cartitem'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [newOrder,cartItem],
}
