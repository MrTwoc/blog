// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	location?: string;
	mood?: string;
	tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
	// {
	// 	id: 1,
	// 	content:
	// 		"这是日记内容: \nThe falling speed of cherry blossoms is five centimeters per second!",
	// 	date: "2025-01-15T10:30:00Z",
	// 	images: ["/images/diary/sakura.jpg", "/images/diary/1.jpg"],
	// 	// 在线图片示例
	// 	// images: ["https://cdn.nlark.com/yuque/0/2023/png/1295434/1687090234568-b261e6e5-1beb-4c37-9919-76d3138f956b.png"],
	// },

	/*
	项目地址：[https://github.com/MrTwoc/learn-wgpu-demo](https://github.com/MrTwoc/learn-wgpu-demo)

<img src="https://cdn.nlark.com/yuque/0/2025/png/1295434/1760975639398-7cd529b0-a5cd-48f8-925d-0d6162b6fca2.png" width="1789" title="" crop="0,0,1,1" id="uf23afff3" class="ne-image">

根据[文章](https://jinleili.github.io/learn-wgpu-zh/beginner/tutorial9-models/#%E6%B8%B2%E6%9F%93%E5%AE%8C%E6%95%B4%E6%A8%A1%E5%9E%8B)内容，完成了基础阶段的最后一章代码，第九章的完整实现，

可以加载obj模型并根据实例化数量进行渲染，接下来，我打算再从第一章开始重新复现一下当前效果，并试着用wgpu+wgsl，实现一个基础的康威生命游戏




	*/
	{
		id: 1,
		content: "初识wgsl \n 项目地址：[https://github.com/MrTwoc/learn-wgpu-demo](https://github.com/MrTwoc/learn-wgpu-demo)",
		date: "2025-08-15T10:30:00Z",
		images: ["https://cdn.nlark.com/yuque/0/2025/png/1295434/1760975639398-7cd529b0-a5cd-48f8-925d-0d6162b6fca2.png"],
		// 在线图片示例
		// images: ["https://cdn.nlark.com/yuque/0/2023/png/1295434/1687090234568-b261e6e5-1beb-4c37-9919-76d3138f956b.png"],
	}
];

// 获取日记统计数据
export const getDiaryStats = () => {
	const total = diaryData.length;
	const hasImages = diaryData.filter(
		(item) => item.images && item.images.length > 0,
	).length;
	const hasLocation = diaryData.filter((item) => item.location).length;
	const hasMood = diaryData.filter((item) => item.mood).length;

	return {
		total,
		hasImages,
		hasLocation,
		hasMood,
		imagePercentage: Math.round((hasImages / total) * 100),
		locationPercentage: Math.round((hasLocation / total) * 100),
		moodPercentage: Math.round((hasMood / total) * 100),
	};
};

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
	const sortedData = diaryData.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	if (limit && limit > 0) {
		return sortedData.slice(0, limit);
	}

	return sortedData;
};

// 获取最新的日记
export const getLatestDiary = () => {
	return getDiaryList(1)[0];
};

// 根据ID获取日记
export const getDiaryById = (id: number) => {
	return diaryData.find((item) => item.id === id);
};

// 获取包含图片的日记
export const getDiaryWithImages = () => {
	return diaryData.filter((item) => item.images && item.images.length > 0);
};

// 根据标签筛选日记
export const getDiaryByTag = (tag: string) => {
	return diaryData
		.filter((item) => item.tags?.includes(tag))
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
};

// 获取所有标签
export const getAllTags = () => {
	const tags = new Set<string>();
	diaryData.forEach((item) => {
		if (item.tags) {
			item.tags.forEach((tag) => tags.add(tag));
		}
	});
	return Array.from(tags).sort();
};

export default diaryData;
