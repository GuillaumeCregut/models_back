create view all_info_model AS
SELECT mu.id, mu.model,mu.provider,mu.pictures,mu.price,mu.owner,mu.state,m.name as modelName, m.picture,m.reference,m.scalemates,b.name as brandName, p.name AS periodName, s.name as scaleName, bu.name as builderName,c.name as categoryName,pr.name as providerName
FROM model_user mu INNER JOIN model m
ON mu.model=m.id
INNER JOIN brand b
ON m.brand=b.id
INNER JOIN period p
ON m.period=p.id
INNER JOIN scale s
ON m.scale=s.id
INNER JOIN builders bu
ON m.builder=bu.id
INNER JOIN category c
ON m.category=c.id
LEFT JOIN provider pr
ON mu.provider=pr.id;