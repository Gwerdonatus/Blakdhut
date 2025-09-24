import { defineField, defineType } from "sanity";

export default defineType({
  name: "coin",
  title: "Coin",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Coin Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "symbol",
      title: "Symbol",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coingeckoId",
      title: "CoinGecko ID",
      type: "string",
      description: "ID from CoinGecko API (e.g., bitcoin, ethereum, sui, toncoin).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isNewListing",
      title: "New Listing?",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

