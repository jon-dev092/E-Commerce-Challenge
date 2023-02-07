const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The /api/tags endpoint

// get all tags
router.get('/', (req, res) => {
// find all tags
// be sure to include its associated Product data
Tag.findAll({
include: [
{
model: Product,
through: ProductTag,
},
],
})
.then((tags) => res.json(tags))
.catch((err) => {
console.log(err);
res.status(500).json(err);
});
});

// get one tag
router.get('/:id', (req, res) => {
// find a single tag by its id
// be sure to include its associated Product data
Tag.findOne({
where: {
id: req.params.id,
},
include: [
{
model: Product,
through: ProductTag,
},
],
})
.then((tag) => {
if (!tag) {
res.status(404).json({ message: 'Tag not found' });
return;
}
res.json(tag);
})
.catch((err) => {
console.log(err);
res.status(500).json(err);
});
});

// create new tag
router.post('/', (req, res) => {
Tag.create({
tag_name: req.body.tag_name,
})
.then((tag) => res.status(201).json(tag))
.catch((err) => {
console.log(err);
res.status(400).json(err);
});
});

// update tag
router.put('/:id', (req, res) => {
Tag.update(
{
tag_name: req.body.tag_name,
},
{
where: {
id: req.params.id,
},
}
)
.then((tag) => {
if (!tag[0]) {
res.status(404).json({ message: 'Tag not found' });
return;
}
res.json(tag);
})
.catch((err) => {
console.log(err);
res.status(400).json(err);
});
});

// delete tag
router.delete('/:id', (req, res) => {
Tag.destroy({
where: {
id: req.params.id,
},
})
.then((tag) => {
if (!tag) {
res.status(404).json({ message: 'Tag not found' });
return;
}
res.json(tag);
})
.catch((err) => {
console.log(err);
res.status(500).json(err);
});
});

module.exports = router;