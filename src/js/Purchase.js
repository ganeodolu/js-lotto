import { CONSTANT, MESSAGE } from "./utils/constants.js";
import { countLottoTemplate, fullLottoTemplate } from "./utils/templates.js";
import { validationNumbers } from "./utils/service.js";

export default class Purchase {
	constructor({
		totalCount,
		manualCount,
		purchasedLottos,
		manualLottos,
		autoLottos,
		$purchaseInfo,
		$purchaseCount,
		$purchaseToggle,
		$lottoInfoManual,
		$manualNumbers,
		$manualNumberInputs,
		$lottoInfo,
		addManualNumbers,
	}) {
		this.totalCount = totalCount;
		this.manualCount = manualCount;
		this.purchasedLottos = purchasedLottos;
		this.manualLottos = manualLottos;
		this.autoLottos = autoLottos;
		this.$purchaseInfo = $purchaseInfo;
		this.$purchaseCount = $purchaseCount;
		this.$purchaseToggle = $purchaseToggle;
		this.$lottoInfoManual = $lottoInfoManual;
		this.$manualNumbers = $manualNumbers;
		this.$manualNumberInputs = $manualNumberInputs;
		this.$lottoInfo = $lottoInfo;

		const clickToggleEvent = () => {
			if (this.$purchaseToggle.checked) {
				this.$lottoInfo.classList.add("flex-col");
			} else {
				this.$lottoInfo.classList.remove("flex-col");
			}
		};

		this.$purchaseToggle.addEventListener("click", clickToggleEvent);

		const onClickAddEvent = (e) => {
			e.preventDefault();
			const manualNumbers = [...this.$manualNumberInputs].map(
				(node) => node.valueAsNumber
			);
			if (this.manualLottos.length >= this.totalCount)
				return alert(MESSAGE.NO_MORE_MANUAL);
			if (validationNumbers(manualNumbers, CONSTANT.WINNING_NUMBERS_LENGTH)) {
				addManualNumbers(manualNumbers);
			}
			[...this.$manualNumberInputs].forEach(
				(element) => (element.value = null)
			);
			[...this.$manualNumberInputs][0].focus();
		};

		this.$manualNumbers.addEventListener("submit", onClickAddEvent);
	}
	render() {
		this.$manualNumbers.classList.remove("hidden");
		this.$purchaseInfo.classList.remove("hidden");
		this.$purchaseCount.innerText = countLottoTemplate(this.totalCount);
	}
	renderManual() {
		this.$lottoInfoManual.insertAdjacentHTML(
			"beforeend",
			fullLottoTemplate(this.manualLottos.slice(-1), true)
		);
	}
	renderAuto() {
		this.$lottoInfo.innerHTML = fullLottoTemplate(
			this.autoLottos,
			this.$purchaseToggle.checked
		);
	}
	setTotalCount(nextTotalCount) {
		this.totalCount = nextTotalCount;
	}
	setPurchasedLottos(nextPurchasedLottos) {
		this.purchasedLottos = nextPurchasedLottos;
		this.renderAuto();
	}
	setManualLottos(nextManualLotto) {
		this.manualLottos = [...this.manualLottos, nextManualLotto];
		this.renderManual();
	}
	setAutoLottos(nextAutoLottos) {
		this.autoLottos = nextAutoLottos;
	}
}
