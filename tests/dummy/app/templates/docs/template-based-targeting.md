# Template-based Targeting

You can set up key-value targeting in your template using the `DoTargeting` component. This is an invisible component that sets up [page-level GPT key-value targeting](https://support.google.com/admanager/answer/1697712#use_key-value_targeting_with_GPT) when created, and clears the targeting when destroyed.

<aside><p>You generally should avoid combining this with the route-based method above for setting key-values for your models.</p><p>You can, however, use the route-based method for setting the path's key-values and the component based method for setting model's key-values.</p></aside>

Place the component in your template and set the `@key` and `@value` properties.

{{#syntax-toggle as |syntax|}}
  {{#syntax.angle}}
    {{#docs-snippet name='do-targeting-basic-classic.hbs'}}
      <DoTargeting @key='foo' @value='bar' />
    {{/docs-snippet}}
  {{/syntax.angle}}
  {{#syntax.classic}}
    {{#docs-snippet name='do-targeting-basic-angle.hbs'}}
      {{do-targeting key='foo' value='bar'}}
    {{/docs-snippet}}
  {{/syntax.classic}}
{{/syntax-toggle}}

You can also use the `@targets` property to pass multiple targets with the `hash` helper.

{{#syntax-toggle as |syntax|}}
  {{#syntax.angle}}
    {{#docs-snippet name='do-targeting-with-hash-classic.hbs'}}
      <DoTargeting @targets={{hash
        story=model.story.slug
        tags=model.story.tags
      }} />
    {{/docs-snippet}}
  {{/syntax.angle}}
  {{#syntax.classic}}
    {{#docs-snippet name='do-targeting-with-hash-angle.hbs'}}
      {{do-targeting targets=(hash
        story=model.story.slug
        tags=model.story.tags
      )}}
    {{/docs-snippet}}
  {{/syntax.classic}}
{{/syntax-toggle}}
