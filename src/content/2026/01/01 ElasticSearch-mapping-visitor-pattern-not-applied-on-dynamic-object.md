---
date: 2026-01-01
---

::post-title{:date="date"}
# ElasticSearch Mapping Visitor Pattern Not Applied on Dynamic Object
::

::notes
This is a repost from my old blog. First posted in 12/21/2020.
::

<br/>

The joy of learning new technology is learning new constraints. There is never enough documentation.

<br/>

I need to insert dynamic objects into ElasticSearch. For the sake of consistency, I need some properties mapped to specify types and the rest will be mapped text. One amazing thing is the ElasticSearch automagical conversion called AutoMap. Seems like AutoMap with visitor pattern and properties override will meet my requirements, so I have something like this in my code:

::code-block
```
public class MapToTextPropertyVisitor : NoopPropertyVisitor
{
    public override IProperty Visit(PropertyInfo propertyInfo,
            ElasticsearchPropertyAttributeBase attribute) => new TextProperty();
}

var createIndexResponse = _client.Indices.Create("<index_name>", c => c
    .Map<dynamic>(m => m
        .AutoMap(new MapToTextPropertyVisitor())
        .Properties(p => p.Date(d => d.Name("<overrides_date_field>"));
```
::

<br/>

AutoMap with manual overrides using fluent mapping:
[https://www.elastic.co/guide/en/elasticsearch/client/net-api/current/fluent-mapping.html#_auto_mapping_overrides_down_the_object_graph]{.text-blue-600}

<br/>

Visitor pattern: 
[https://www.elastic.co/guide/en/elasticsearch/client/net-api/current/visitor-pattern-mapping.html]{.text-blue-600}

<br/>

But for somewhat reason, some of my dynamic object's properties that are not overridden are still mapped to date type when it is supposed to be mapped to text.

<br/>

I found out later that the visitor pattern doesn't apply to dynamic mapping in which my dynamic objects are subjected to. It only applies to POCO with clear types. 

<br/>

Another thing is in my case, the properties in my dynamic object are all of type string. String in ElasticSearch for dynamic mapping has two different kind of detections applied to it:

<br/>

- Date detection
- Number detection

[https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-field-mapping.html]{.text-blue-600}

<br/>

So, my problem were solved by disabling the two detections. That makes the string properties stay as string.