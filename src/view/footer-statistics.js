const createFooterStatisticsTemplate = (task) => {
  return `<section class="footer__statistics">
    <p>${task.length} movies inside</p>
  </section>`;
};

export {createFooterStatisticsTemplate};
