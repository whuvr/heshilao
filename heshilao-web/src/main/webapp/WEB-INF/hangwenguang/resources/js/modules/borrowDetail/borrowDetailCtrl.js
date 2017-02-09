define([
    'angular',
    'services/invest/investRankService'
], function(
    angular,
    investRankService
) {
    return function(app, elem, attrs, scope) {

        app.controller('borrowDetailCtrl', [
            '$state', '$stateParams', '$scope', 'cService', '$location', 'popupDialog', '$rootScope', 'investRankService',
            function($state, $stateParams, $scope, cService, $location, popupDialog, $rootScope, investRankService) {

                var id = $stateParams.id
                var userId = $location.$$search.userId;

                var CONSTANT_REDPACKETPLACEHOLDER = '请选择红包';

                var borrowDetailUrl = 'borrows' + '/' + id;
                var investmentListUrl = 'investments/borrow';
                var investBorrowUrl = 'investments';
                var borrowProtocolPreviewUrl = 'borrows/borrowProtocolPreview';
                $scope.isExist = null; //if the borrow exist according to the stauts of borrow detail.
                var
                    redPackets = [],
                    $redpDialogHandler = null,
                    $payDialogHandler = null;

                $scope.rRedpAll = false;
                $scope.rInvalidateRatio = false; //if red packe ratio is invalidate
                $scope.monthRankData = [];
                $scope.imagePageSize = 6;
                $scope.imageData = [];
                //get the borrow detail

                //display borrow image list

                $scope.imagePagingAction = function(page) {
                    $scope.imageData = [];
                    for (var i = (page - 1) * $scope.imagePageSize; i < page * $scope.imagePageSize; i++) {
                        if (!$scope.borrowImageList[i]) break;
                        $scope.imageData.push($scope.borrowImageList[i]);
                    }

                }


                //dispaly invest record
                $scope.recordPage = 1;
                $scope.recordPageSize = 10;
                $scope.recordTotal = 0;
               /* ($scope.getInvestmentList = function(page) {
                    cService.ajax({
                        url: investmentListUrl,
                        method: 'get',
                        params: {
                            page: page,
                            rows: $scope.recordPageSize,
                            borrowId: id
                        }
                    }).success(function(response) {
                        $scope.investmentList = response.rows;
                        $scope.recordTotal = response.total;
                    })
                })(1);*/



                //red packet
                $scope.redpacketTotal = 0;
                $scope.redpacketPlaceholder = CONSTANT_REDPACKETPLACEHOLDER;
                $scope.selectRedpacket = function(e, item) {
                    var amount = item.amount;
                    $scope.rInvalidateRatio = false;
                    if (!item.checked) {
                        if ($scope.redpacketTotal + amount <= $scope.investValue * $scope.borrowData.redPacketInvestMaxRatioKey) {
                            $scope.redpacketTotal += amount;
                            item.checked = true;
                        } else {
                            item.checked = false;
                            $scope.rInvalidateRatio = true;
                        }

                    } else {
                        $scope.redpacketTotal -= amount;
                        item.checked = false;
                    }
                }

                function getRedPacketIds() {

                    var redPacketIds = [];
                    for (var i = 0; i < redPackets.length; i++) {
                        if (redPackets[i].checked) redPacketIds.push(redPackets[i].id);
                    }
                    return redPacketIds.join(',');
                }
                $scope.openRedp = function() {
                    if (redPackets.length == 0) return;
                    if (!$scope.investValue) {
                        alert('请输入投资金额', {
                            type: 'info'
                        })
                        return;
                    }
                    //$scope.rRedpAll = false;
                    $scope.rInvalidateRatio = false;
                    $redpDialogHandler = popupDialog('template_redp', $scope, {
                        title: '请选择可使用红包',
                        css: {
                            width: '600px',
                            overflow: 'auto'
                        },
                        wait: false,
                        buttons: []
                    });
                }

                $scope.clearRedp = function() {
                    if ($scope.redpacketTotal > 0) {
                        angular.forEach(redPackets, function(item, i) {
                            item.checked = false;
                        });
                        $scope.rRedpAll = false;
                        $scope.redpacketTotal = 0;
                    }
                }
                // 用base替换
                // $scope.selectAllRedp = function(e) {
                //     var
                //         _this = angular.element(e.target),
                //         total = 0,
                //         checked = _this.prop('checked');
                //     $scope.rInvalidateRatio = false;
                //     if (checked) {
                //         angular.forEach(redPackets, function(item, i) {
                //             total += item.amount;
                //         });
                //         if (total <= $scope.investValue * $scope.borrowData.redPacketInvestMaxRatioKey) {
                //             angular.forEach(redPackets, function(item, i) {
                //                 if (checked) {
                //                     item.checked = true;
                //                 }
                //             })
                //             $scope.redpacketTotal = total;
                //         } else {
                //             _this.prop('checked', false);
                //             checked = false;
                //             $scope.rInvalidateRatio = true;
                //         }
                //     } else {
                //         $scope.clearRedp();
                //     }
                //     $scope.rRedpAll = checked;
                // }

                //form validate 用base替换
                // $scope.validate = function() {
                //     var investVal = parseFloat($scope.investValue);
                //     $scope.invalidRange = false;
                //     $scope.invalidBalanceAvailable = false;
                //     $scope.invalidRealNameStatus = false;

                //     if (!$rootScope.user.id) return;
                //     //if afford to invest
                //     if ($rootScope.user.realNameStatus != 1) {
                //         $scope.invalidRealNameStatus = true;
                //         return false;
                //     } else if (!investVal || (investVal < $scope.borrowData.investMin && !$scope.disabledInput) || investVal > ($scope.borrowData.amountInvestable) || (investVal > $scope.borrowData.investMax && $scope.borrowData.investMax != 0)) {
                //         $scope.invalidRange = true;
                //         return false;
                //     } else if (investVal > $scope.borrowData.useableBalanceAvailable) {
                //         $scope.invalidBalanceAvailable = true;
                //         return false;
                //     } else {
                //         return true;
                //     }
                // }

                //invest 用base替换
                // $scope.investBorrow = function(form) {
                //     if ($scope.validate()) {
                //         var ele = angular.element(document.getElementById('investFunds'));
                //         var val = fieldRSA(ele);
                //         $payDialogHandler = popupDialog('template_pay', $scope, {
                //             buttons: [],
                //             ajax: function() {
                //                 var $dialog = this;
                //                 return cService.ajax({
                //                     url: investBorrowUrl,
                //                     method: 'post',
                //                     params: {
                //                         borrowId: id,
                //                         capitalStr: val,
                //                         // capital: $scope.investValue,
                //                         redPacketIds: getRedPacketIds(),
                //                         passwordDirect: $scope.investPassword
                //                     }
                //                 }).success(function(payUrl) {
                //                     $scope.payUrl = payUrl;
                //                 })
                //             }
                //         });
                //     } else {

                //     }
                // }
                // preview protocol  用base替换
                // $scope.viewProtocol = function() {

                //     popupDialog('', $scope, {
                //         css: {
                //             width: '650px',
                //             height: '400px',
                //             overflow: 'auto'
                //         },
                //         ajax: function() {
                //             var $dialog = this;
                //             return cService.ajax({
                //                 url: borrowProtocolPreviewUrl,
                //                 method: 'get',
                //                 params: {
                //                     borrowId: id
                //                 }
                //             }).success(function(protocol) {
                //                 $dialog.append('<div class="tl">' + protocol + '</div>');
                //             })
                //         }
                //     });

                // }
                $scope.closeRedpDialog = function() {
                    $redpDialogHandler.close($redpDialogHandler);
                }
                $scope.closePayDialog = function() {
                    if ($payDialogHandler) {
                        $payDialogHandler.close($payDialogHandler);
                        $payDialogHandler = null;
                    }
                }

                $scope.reload = function() {
                    $scope.closePayDialog();
                    location.reload();
                }
                $scope.returnWindow = function() {
                    history.go(-1);
                }

                $scope.gotoAnchor = cService.gotoAnchor;

                //invest rank
                /*$scope.monthRankData = investRankService.getList({
                    scope: $scope,
                    name: 'monthRankData',
                    isSingle: true,
                    params: {
                         borrowId: id
                    }

                });*/

                //img page prev or next
                $scope.imgPageNext = function(bNext) {
                    if (bNext == false && $scope.imagePage > 1) {
                        $scope.imagePagingAction(--$scope.imagePage);
                    } else if (bNext != false && $scope.imagePage < $scope.imagePageCount) {
                        $scope.imagePagingAction(++$scope.imagePage);
                    }


                }


            }
        ])
    }
});