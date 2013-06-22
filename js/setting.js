/*
 * Icons for COFOG taxonomy
 *
 */
var Taxes = Taxes || {};

Taxes.baseKoujo = 330000; // 住民税基礎控除
Taxes.huyoKoujo = 330000; // 一人分の扶養控除
Taxes.taxRate = 0.06; // 住民税率

// var OpenSpending = OpenSpending || {};
OpenSpending = OpenSpending || {};

OpenSpending.identifier = 'ishinomaki';
OpenSpending.year = '2013';

OpenSpending.Styles = OpenSpending.Styles || {};

OpenSpending.Styles.Cofog = {

  /* ishinomaki cofog */
  '1': { icon: 'icons/family.svg', color: '#C75746', bcolor: '#935B3B' }, // 子育て・教育
  '101': { icon: 'icons/pre-school.svg', color: '#C75746', bcolor: '#935B3B' }, // 子ども・青少年
  '102': { icon: 'icons/education.svg', color: '#C75746', bcolor: '#935B3B' }, // 社会教育（大人）
  '2': { icon: 'icons/police2.svg', color: '#C75746', bcolor: '#0AB971' }, // 安全
  '201': { icon: 'icons/order-safety.svg', color: '#C75746', bcolor: '#0AB971' }, // 消防・交通安全
  '202': { icon: 'icons/c_bousai.svg', color: '#C75746', bcolor: '#0AB971' }, // 防災
  '3': { icon: 'icons/machi.svg', color: '#C75746', bcolor: '#4E6D00' }, // まちづくり
  '301': { icon: 'icons/EC.svg', color: '#C75746', bcolor: '#4E6D00' }, // 新設
  '302': { icon: 'icons/garbage.svg', color: '#C75746', bcolor: '#4E6D00' }, // 維持・管理
  '4': { icon: 'icons/sangyou3.svg', color: '#C75746', bcolor: '#D33673' }, // 産業
  '401': { icon: 'icons/c_nougyou.svg', color: '#C75746', bcolor: '#D33673' }, // 農業
  '402': { icon: 'icons/forest.svg', color: '#C75746', bcolor: '#D33673' }, // 林業
  '403': { icon: 'icons/fishing.svg', color: '#C75746', bcolor: '#D33673' }, // 水産業
  '404': { icon: 'icons/c_syoukougyou.svg', color: '#C75746', bcolor: '#D33673' }, // 商工業
  '405': { icon: 'icons/island.svg', color: '#C75746', bcolor: '#D33673' }, // 観光業
  '5': { icon: 'icons/helping-others.svg', color: '#C75746', bcolor: '#2A3A03' }, // 健康・福祉・環境
  '501': { icon: 'icons/health.svg', color: '#C75746', bcolor: '#2A3A03' }, //　健康
  '502': { icon: 'icons/wheelchair.svg', color: '#C75746', bcolor: '#2A3A03' }, //　福祉
  '503': { icon: 'icons/environment.svg', color: '#C75746', bcolor: '#2A3A03' }, //　環境
  '6': { icon: 'icons/economic-aid.svg', color: '#C75746', bcolor: '#EC2406' }, // 公債
  '601': { icon: 'icons/economic-aid.svg', color: '#C75746', bcolor: '#EC2406' }, // 公債
  '7': { icon: 'icons/financial-admin.svg', color: '#C75746', bcolor: '#938626' }, // その他
  '701': { icon: 'icons/vote01.svg', color: '#C75746', bcolor: '#938626' }, // 選挙
  '702': { icon: 'icons/government-uk.svg', color: '#C75746', bcolor: '#938626' }, // 議会
  '703': { icon: 'icons/our-streets.svg', color: '#C75746', bcolor: '#938626' }, // その他
  '8': { icon: 'icons/aid-developing-countries.svg', color: '#C75746', bcolor: '#C75746' }, // 震災関係
  '801': { icon: 'icons/family.svg', color: '#C75746', bcolor: '#C75746' }, // 子育て・教育
  '802': { icon: 'icons/police2.svg', color: '#C75746', bcolor: '#C75746' }, // 安全
  '803': { icon: 'icons/our-streets.svg', color: '#C75746', bcolor: '#C75746' }, // まちづくり
  '804': { icon: 'icons/civilian-action.svg', color: '#C75746', bcolor: '#C75746' }, // 産業
  '805': { icon: 'icons/helping-others.svg', color: '#C75746', bcolor: '#C75746' }, // 健康・福祉・環境
  '806': { icon: 'icons/our-streets.svg', color: '#C75746', bcolor: '#C35B4B' }  // 基金・諸経費
};

if (window.location.pathname == "/bubbletree.html") {
  function bubbletreedraw() {
    $(function() {
      var $tooltip = $('<div class="tooltip">Tooltip</div>');
      $('.bubbletree').append($tooltip);
      $tooltip.hide();

      var dataLoaded = function(data) {
        window.bubbleTree = new BubbleTree({
          data: data,
          container: '#bubbletree',
          bubbleType: 'icon',
          bubbleStyles: {
              'cofog':  OpenSpending.Styles.Cofog,
          },
          clearColors: true, // remove all colors coming from OpenSpending API
          rootPath: '/',
            tooltip: {
              qtip: true,
              delay: 800,
              content: function(node) {
                return [node.label, '<div class="desc">'+(node.description ? node.description : 'No description given')+'</div><div class="amount">\u00A5 '+node.famount+'</div>'];
              }
            }
        });
      };

      // call openspending api for data
      new OpenSpending.Aggregator({
        apiUrl: 'http://openspending.org/api',
        //Use static file instead of api
        //localApiCache: 'aggregate.json',
        dataset: OpenSpending.identifier,
        rootNodeLabel: 'Total',
        drilldowns: ['category', 'subcategory'],
        cuts: ['year:' + OpenSpending.year],
        breakdown: 'subcategory',
        callback: dataLoaded
      });
    });
  }
};
