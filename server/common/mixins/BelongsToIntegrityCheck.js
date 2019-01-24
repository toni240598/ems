/* Ce mixin permet de vérifier les contraintes d'intégrité (l'objet enfant possède bien un parent)
en vérifiant que les clés étrangères des objets parents existes bien lors de la création d'un objet enfant */

'use strict';

let _ = require('lodash');

let checkBelongsToIntegrity = function(ctx, next) {
  if (ctx.instance) {
    let relations = ctx.Model.definition.settings.relations;
    let relationsArray = _.map(relations, rel => {
      return {modelName: rel.model, fk: rel.foreignKey, type: rel.type};
    });

    /* On utilise Lodash pour transformer l'objet des relations en Tableau de la forme
      [
        { modelName: 'achat', fk: 'achat_id', type: 'belongsTo' },
        { modelName: 'FED_AGENT', fk: 'agent_rfagent', type: 'belongsTo' }
      ]
    */

    let thisModel = ctx.Model;
    // Le message qui sera renvoyé en cas d'échec de vérification des contraintes d'intégrité
    let message = '';
    // Le tableau des promises correspondant aux requêtes vérifiants les contraintes
    let promiseArray = [];

    relationsArray.forEach(function(relation) {
      if (relation.type == 'belongsTo') {
        let parentModelName = relation.modelName;
        let parentModel = thisModel.app.models[parentModelName];
        let parentId = ctx.instance[relation.fk];

        // On cherche le modèle parent qui correspond à l'id demandé pour le modèle enfant...
        promiseArray.push(parentModel.findById(parentId).then(function(parentInstance) {
          if (parentInstance === null) {
            message += `No ${parentModelName} with id ${parentId}`;
          }
        }));
      }
    }
    );

    /* Une fois que toutes les promesses ont été déterminées et conduisent vers un message en cas de non respect de la contrainte d'intégrité,
    on les regroupe dans une promesse commune résolue quand toutes sont résolues et qui renvoit le message en cas de non respect de contrainte */
    Promise.all(promiseArray)
      .then(
      function() {
        next(message);
      }
      , console.error)
      .catch(function(err) {
        next(err);
      });
  }
};

module.exports = function(Model, options) {
  Model.observe('before save', checkBelongsToIntegrity);
};
