import _ from 'lodash';
import {
  ruleWithSubQueries as ruleWithSubQueriesMock,
  transformedRuleWithSubQueries as transformedRuleWithSubQueriesMock,
} from '../../../mock-data/data-raptor/rule.data';
import { RuleTransformer } from './RuleTransformer';

describe('Rule Transformer Util', () => {
  describe('processing a rule that has sub queries', () => {
    let ruleWithSubQueries;
    beforeEach(() => {
      ruleWithSubQueries = _.cloneDeep(ruleWithSubQueriesMock);
    });
    it('can make respective transformations', () => {
      const transformedRule = RuleTransformer.processRuleTransformations(
        ruleWithSubQueries.rule,
      );
      expect(transformedRule).toEqual(transformedRuleWithSubQueriesMock);
    });
  });
});
