/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import moment from "moment";
import "moment/locale/id";
// without this line it didn't work
moment.locale("id");

export default class UnitConvert {
  static FormatCurrency = (
    amount?: number | string,
    currency?: "USD" | "IDR"
  ) => {
    if (amount && currency) {
      if (typeof amount === "string") {
        const newamount = parseFloat(amount);
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency,
        }).format(newamount);
      }
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
      }).format(amount);
    }
    return "Rp 0,00";
  };

  static FormatDurationHuman = (duration?: string | number | null) => {
    if (duration === null || duration === undefined) return "-";
    return moment.duration(duration, "minute").humanize(false, { m: 1 });
  };

  static FormatDate = (date?: string | Date | null) => {
    if (!date) {
      return "-";
    }

    const momentDate = moment(date).utcOffset(-7);
    if (!momentDate.isValid()) {
      return "-";
    }

    // Check if the date is within the last 24 hours
    // console.log(moment().diff(momentDate, "hour"))
    const diff = moment().diff(momentDate, "hour");
    if (diff <= 24 && diff >= 0) {
      // Display a human-readable format like '2 hours ago'
      return momentDate.fromNow();
    }

    // For dates older than 24 hours, use the standard format
    return momentDate.format("DD/MM/YYYY HH:mm");
  };

  static FormatDateClassic = (date?: string | Date | null) => {
    if (!date) {
      return "-";
    }

    const momentDate = moment(date);
    if (!momentDate.isValid()) {
      return "-";
    }

    // For dates older than 24 hours, use the standard format
    return momentDate.format("DD/MM/YYYY HH:mm");
  };

  static PadNumber(
    num: number | undefined,
    places: number | undefined
  ): string {
    if (num && places) return String(num).padStart(places, "0");
    return "00";
  }

  static FormatDuration = (date?: string | Date | null) => {
    if (!date) {
      return "-";
    }

    const momentDate = moment(date);
    if (!momentDate.isValid()) {
      return "-";
    }
    return momentDate.fromNow();
  };

  static FormatDurationFromTwoDate = (
    date1?: string | Date | null,
    date2?: string | Date | null
  ) => {
    if (!date1 && !date2) {
      return "-";
    }

    const momentDate = moment(date1);
    const momentDate2 = moment(date2);
    if (!momentDate.isValid() && !momentDate2.isValid()) {
      return "-";
    }
    // console.log(moment.duration(momentDate.diff(momentDate2, 'second'), 'second').humanize())
    return moment
      .duration(momentDate.diff(momentDate2, "second"), "second")
      .humanize();
  };

  static FormatDurationFromTwoDateClassic = (
    date1?: string | Date | null,
    date2?: string | Date | null
  ) => {
    if (!date1 && !date2) {
      return "-";
    }

    const momentDate = moment(date1);
    const momentDate2 = moment(date2);
    if (!momentDate.isValid() && !momentDate2.isValid()) {
      return "-";
    }

    const duration = moment.duration(
      momentDate2.diff(momentDate, "second"),
      "second"
    );
    const hours = Math.floor(duration.asHours());
    // Ensure minutes and seconds are based on the total duration, not just the remainder
    const minutes = Math.floor(duration.minutes());
    const seconds = Math.floor(duration.seconds());

    // Pad the numbers to ensure they are always two digits
    const pad = (num: number) => num.toString().padStart(2, "0");
    const pad3 = (num: number) => num.toString().padStart(3, "0");
    // Format the duration as HH:MM:SS
    return `${pad3(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  static FormatNumber(num: number | undefined): string {
    if (!num && num !== 0) return "-";
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  static FormatNumberUOM(num: number | undefined): string {
    if (!num && num !== 0) return "-";
    return new Intl.NumberFormat("id-ID").format(num);
  }

  static FormatUOM = (
    unit?: string | number | null,
    uomTarget?: "KG" | "KGM" | "Bale" | string,
    uomFrom?: "KG" | "KGM" | "Bale" | "BALE" | "Bales" | string,
    format = true
  ) => {
    const unit_fix =
      typeof unit === "string"
        ? parseFloat(unit)
        : typeof unit === "number"
        ? unit
        : 0;
    const uomKG = ["KG", "KGM", null];
    const uomBales = ["Bale", "Bales", "BALE"];
    if (uomFrom && uomTarget) {
      // dari kg ke bale
      if (uomKG.includes(uomFrom) && uomBales.includes(uomTarget)) {
        return format
          ? `${this.FormatNumberUOM(unit_fix / 181.44)} ${uomTarget}`
          : unit_fix / 181.44;
      }
      // dari bale ke kg
      if (uomBales.includes(uomFrom) && uomKG.includes(uomTarget)) {
        return format
          ? `${this.FormatNumberUOM(unit_fix * 181.44)} ${uomTarget}`
          : unit_fix * 181.44;
      }
    }
    return format
      ? unit_fix
        ? `${this.FormatNumberUOM(unit_fix)} ${uomTarget}`
        : "-"
      : unit_fix;
  };
}
